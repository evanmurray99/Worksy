import React from 'react';
import '../Styles/PopUpModal.css';

export default function PopUpModal({ title, isOpen, updateIsOpen, content }) {
	var result = null;

	if (isOpen) {
		result = (
			<div className="backDrop" onClick={() => updateIsOpen(false)}>
				<div className="modal" onClick={(event) => event.stopPropagation()}>
					<div className="modalTitle">
						<button
							className="modalClose floatLeft"
							onClick={() => updateIsOpen(false)}
						>
							X
						</button>
						<p className="largeText">{title}</p>
					</div>
					{content}
				</div>
			</div>
		);
	}

	return result;
}
