"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "./ui/input";

const formSchema = z.object({
	input: z.string().min(2).max(50),
});

function SearchInput() {
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			input: "",
		},
	});

	function onSubmit(values: z.infer<typeof formSchema>) {
		console.log(values);
		router.push(`/search/${values.input}`);
		form.reset();
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
				<FormField
					control={form.control}
					name="input"
					render={({ field }) => (
						<FormItem>
							<FormControl>
								<Input
									placeholder="Search..."
									{...field}
								></Input>
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}

export default SearchInput;
