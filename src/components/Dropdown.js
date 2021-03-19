import React, { useState, useEffect, useRef } from 'react';


const Dropdown = ({ options, selected, onSelectedChange, label }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  
  useEffect(() => {
    const onBodyClick = (event) => {
      if(ref.current && ref.current.contains(event.target)) {
        return;
      }

      setOpen(false);
    }

    document.body.addEventListener('click', onBodyClick, {capture: true});

    return () => {
      document.body.removeEventListener('click', onBodyClick);
    };
  }, []);

  const renderedOptions = options.map(opt => {
    if(opt.value === selected.value) return null; //ou filter com (selected.value !== options.value)
    return ( 
      <div
        key={opt.value}
        className="item"
        onClick={() => onSelectedChange(opt)}>
        {opt.label}
      </div>
    )
  });

  return (
    <div className="ui form" ref={ref}>
      <div className="field">
        <label className="label">{label}</label>
        <div onClick={() => setOpen(!open)} className={`ui selection dropdown ${open ? 'visible active' : ''}}`}>
          <i className="dropdown icon"></i>
          <div className="text">{selected.label}</div>
          <div className={`menu ${open ? 'visible transition' : ''}`}>
            {renderedOptions}
          </div>
        </div>
      </div>
      {/* <p>The color is: <span style={{ color: `${selected.value}`}}>{selected.value.toUpperCase()}</span></p> */}
    </div>

  );
};



export default Dropdown;