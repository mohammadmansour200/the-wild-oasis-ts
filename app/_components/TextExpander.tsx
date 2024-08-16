"use client";
import { useState } from "react";
interface ITextExpanderProps {
	children: string;
}
function TextExpander({ children }: ITextExpanderProps) {
	const [isExpanded, setIsExpanded] = useState(false);
	const displayText =
		children.length >= 70 && isExpanded
			? children
			: children.split(" ").slice(0, 10).join(" ") + "...";

	return (
		<span>
			{displayText}{" "}
			{children.length >= 70 && (
				<button
					className="text-primary-700 border-b border-primary-700 leading-3 pb-1"
					onClick={() => setIsExpanded(!isExpanded)}
				>
					{isExpanded ? "Show less" : "Show more"}
				</button>
			)}
		</span>
	);
}

export default TextExpander;
