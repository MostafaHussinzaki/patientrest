import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { FormControl } from "./ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// import doctorImage from "@/assets/dr-cruz.png";
import { DOCTORS } from "@/lib/constant";

const SelectDoctor = ({
	field,
	disabled,
}: {
	field: any;
	disabled?: boolean;
}) => {
	return (
		<Select
			onValueChange={field.onChange}
			defaultValue={field.value}
			disabled={disabled}
		>
			<FormControl>
				<SelectTrigger className="shad-select-trigger h-fit">
					<SelectValue placeholder="Choose a Doctor" />
				</SelectTrigger>
			</FormControl>
			<SelectContent className="">
				{DOCTORS.map((doc, i) => {
					const names = doc.name.split(" ");
					const fallback = `${names[0][0]} ${names[1][0]} `;
					return (
						<SelectItem value={doc.name} key={doc.name}>
							<div className="w-full flex items-center justify-start gap-6">
								<Avatar>
									<AvatarImage src={doc.img} />
									<AvatarFallback>{fallback.toUpperCase()}</AvatarFallback>
								</Avatar>
								<h3 className="text-white font-medium">Dr. {doc.name}</h3>
							</div>
						</SelectItem>
					);
				})}
			</SelectContent>
		</Select>
	);
};

export default SelectDoctor;
