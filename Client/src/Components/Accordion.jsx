import React, { useState } from 'react';
import '../Styles/Accordion.css';

function checkIsOpen(state) {
	var currSymbol = '+';

	if (state) {
		currSymbol = '- ';
	}

	return <p className="removePadding floatRight resize">{currSymbol}</p>;
}

function showContent(state, accordContent, hasBackdrop) {
	var content = null;
	var formatting = 'layout';

	if (hasBackdrop) {
		formatting += ' backdrop';
	}

	if (state) {
		content = <div className={formatting}>{accordContent}</div>;
	}

	return content;
}

export default function Accordion({ title, content, hasBackdrop }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="contentContainer">
			<div className="titleBar" onClick={() => setIsOpen(!isOpen)}>
				<h2 className="removePadding floatLeft">{title}</h2>
				{checkIsOpen(isOpen)}
			</div>
			{showContent(isOpen, content, hasBackdrop)}
		</div>
	);
}
