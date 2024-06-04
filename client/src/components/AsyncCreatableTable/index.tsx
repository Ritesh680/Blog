/* eslint-disable @typescript-eslint/no-explicit-any */
import { Suspense, useState } from "react";
import {
	FieldValues,
	UseControllerProps,
	useController,
} from "react-hook-form";
import {
	QueryFunctionContext,
	useMutation,
	useQuery,
	useQueryClient,
} from "react-query";
import AsyncCreatableSelect from "react-select/async-creatable";
import InfiniteProgressBar from "../InfiniteProgressBar";

interface IFormSelectOption {
	label: string;
	value: string | number;
	disabled?: boolean;
}

interface IFormSelectGroup {
	label: string;
	options: IFormSelectOption[];
}

interface ICreatableSelect<TData, T, U extends FieldValues>
	extends UseControllerProps<U> {
	queryKey: string;
	queryFunction: (context: QueryFunctionContext) => Promise<TData>;
	mutationFunction: (variables: string) => Promise<T>;
}

const AsyncCreatable = <
	TData extends { data: T[] },
	T extends { name: string } | IFormSelectGroup | IFormSelectOption,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	U extends FieldValues
>({
	name,
	control,
	rules,
	defaultValue,
	queryKey,
	queryFunction,
	mutationFunction,
}: ICreatableSelect<TData, T, U>) => {
	const queryClient = useQueryClient();
	const {
		field,
		fieldState: { error },
	} = useController({ name, control, rules, defaultValue });

	const [options, setOptions] = useState<{ label: string; value: string }[]>(
		[]
	);

	const { isLoading, isFetching } = useQuery({
		queryKey: queryKey,
		queryFn: queryFunction,
		onSuccess: (data) => {
			setOptions(
				data.data.map((option: any) => ({
					label: option.name,
					value: option._id,
				}))
			);
		},
	});

	const createTag = useMutation({
		mutationFn: mutationFunction,
		onSuccess: () => {
			queryClient.invalidateQueries([queryKey]);
			queryClient.refetchQueries([queryKey]);
		},
	});

	if (isLoading || isFetching) return <InfiniteProgressBar />;

	function onCreateOption(value: string) {
		createTag.mutate(value);
	}

	const filterValues: (
		inputValue: string
	) => (IFormSelectGroup | IFormSelectOption)[] = (inputValue: string) => {
		const res =
			options.filter((i: IFormSelectOption) =>
				inputValue
					? i.label.toLowerCase().includes(inputValue?.toLowerCase())
					: i
			) || [];

		return res;
	};

	const loadOptions = (
		inputValue: string,
		callback: (options: any) => void
	) => {
		setTimeout(() => {
			callback(filterValues(inputValue || ""));
		}, 1000);
	};

	return (
		<Suspense>
			<AsyncCreatableSelect
				{...field}
				cacheOptions
				defaultOptions
				loadOptions={loadOptions}
				styles={{
					option: (defaultStyles, state) => ({
						...defaultStyles,
						maxWidth: "382px",
						backgroundColor:
							state.isSelected || state.isFocused ? "#F1F5F9" : "white",
					}),
					control: (baseStyles) => ({
						...baseStyles,
						borderColor: "#E2E8F0",
						boxShadow: "none",
						maxWidth: "382px",
						fontSize: "0.875rem",
						"&:hover": {
							border: "1px solid #E2E8F0",
						},
						border: "1px solid #E2E8F0",
						borderRadius: "0.375rem",
					}),
				}}
				isClearable
				onCreateOption={onCreateOption}
				value={options.find(
					(opt) =>
						opt.value?.toLowerCase() === field.value?.toString()?.toLowerCase()
				)}
				onChange={(data: any) => {
					data && field.onChange(data?.value);
				}}
			/>
			{error && (
				<span className="text-sm text-red-600 list-none">{error.message}</span>
			)}
		</Suspense>
	);
};

export default AsyncCreatable;
