import { ReactNode } from "react";
import { Label } from "./ui/label";

interface InputFieldProps {
	children: ReactNode;
	label: string;
	htmlFor: string;
	className?: string;
	errors: any;
}

const InputField = ({
	children,
	label,
	htmlFor,
	className,
	errors,
}: InputFieldProps) => {
	return (
		<div className={className}>
			<Label htmlFor={htmlFor} className="text-[#ABB8C4] text-sm mb-4">
				{label}
			</Label>
			{children}
			{errors && (
				<p className="text-[12px] text-red-400 mt-2">
					{errors.message}
				</p>
			)}
		</div>
	);
};

export default InputField;
