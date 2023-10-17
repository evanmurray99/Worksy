import React, {useState} from 'react'
import './Accordion.css'

function checkIsOpen(state)
{
    var currSymbol = "+"

    if(state)
    {
        currSymbol = "- "
    }

    return (<p className="right">{currSymbol}</p>)
}

function showContent(state, accordContent, hasBackdrop)
{
    var content = null
    var formatting = "layout"

    if(hasBackdrop)
    {
        formatting += " backdrop"
    }

    if(state)
    {
        content = (
        <div className={formatting}>
            <p className="content">
                {accordContent}
            </p>
        </div>)
    }

    return content
}

export const Accordion = (props) =>
{    
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="contentContainer">
            <div className="titleBar" onClick={() => setIsOpen(!isOpen)}>
                <h2 className="left">{props.title}</h2>
                {checkIsOpen(isOpen)}
            </div>
            {showContent(isOpen, props.content, props.hasBackdrop)}
        </div>)
}