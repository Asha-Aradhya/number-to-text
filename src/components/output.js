import React from 'react';

export default function Output(props) {
   return <output className={!isNaN(props.inputvalue) && !!props.inputvalue ? 'show' : 'hide'}>{props.outputvalue}<br /><br /></output>
}