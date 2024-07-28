import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";
import { FormControl } from "./ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import doctorImage from "@/assets/dr-cruz.png";

const SelectDoctor = ({ field }: { field: any }) => {
	return (
		<Select onValueChange={field.onChange} defaultValue={field.value}>
			<FormControl>
				<SelectTrigger className="shad-select-trigger h-fit">
					<SelectValue placeholder="Choose a Doctor" />
				</SelectTrigger>
			</FormControl>
			<SelectContent className="">
				<SelectItem value="dr. cruz">
					<div className="w-full flex items-center justify-start gap-6">
						<Avatar>
							<AvatarImage src={doctorImage.src} />
							<AvatarFallback>dr.cruz</AvatarFallback>
						</Avatar>
						<h3 className="text-white font-medium">Dr. cruz</h3>
					</div>
				</SelectItem>
				<SelectItem value="dr. x">
					<div className="w-full flex items-center justify-start gap-6">
						<Avatar>
							<AvatarImage src={doctorImage.src} />
							<AvatarFallback>dr.cruz</AvatarFallback>
						</Avatar>
						<h3 className="text-white font-medium">Dr. cruz</h3>
					</div>
				</SelectItem>
			</SelectContent>
		</Select>
	);
};

export default SelectDoctor;
