import React, { useEffect, useState } from "react";

function RequirementField({ name, label, register, errors, setValue, getValue }) {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);

    const handleAddRequirement = (e) => {
        e.preventDefault();
        if (requirement) {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (req) => {
        const newRequirementList = requirementList.filter((item) => item !== req);
        setRequirementList(newRequirementList);
    }

    // useEffect(() => {
    //     register(name, {
    //         required: true,
    //         validate: (value) => value.length > 0
    //     })
    // },[])

    return <div>

        <label htmlFor={name}>{label}</label>
        <div className="">

            <input
                type="text"
                id={name}
                value={requirement}
                onChange={(e) => { setRequirement(e.target.value) }}
                className="w-full"
            />

            <button
                className="font-semibold text-yellow-50"
                onClick={handleAddRequirement}>
                Add
            </button>

        </div>

        {
            requirementList.length > 0 && (
                <ul>
                    {
                        requirementList.map((item, idx) => (
                            <>
                                <li key={idx}>{item}</li>
                                <button
                                    className="text-xs text-pure-greys-300"
                                    onClick={() => { handleRemoveRequirement(item) }}
                                >
                                    Clear
                                </button>
                            </>
                        ))
                    }
                </ul>
            )
        }

    </div>;
}

export default RequirementField;
