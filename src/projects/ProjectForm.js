import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Project } from "./Project";

function ProjectForm({ project: initialProject, onSave, onCancel }) {
    const [project, setProject] = useState(initialProject);
    const [errors, setErrors] = useState({ name: '', description: '', budget: '' });
    const handleSubmit = (event) => {
        event.preventDefault();
        if (!isValide()) return;
        onSave(project);
    };
    const handleChange = (event) => {
        const { type, name, value, checked } = event.target;

        let updatedValue = type === 'checkbox' ? checked : value;

        if (type === 'number') {
            updatedValue = Number(updatedValue);
        }
        const change = {
            [name]: updatedValue,
        };

        let updatedProject;
        setProject((p) => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
        });
        setErrors(() => validate(updatedProject));
    };
    function validate(project) {
        let errors = { name: '', description: '', budget: '' };
        if (project.name.length === 0) {
            errors.name = 'Name is required';
        }
        if (project.name.length > 0 && project.name.length < 3) {
            errors.name = 'Name needs to be atleast 3 characters.';
        }
        if (project.description.length === 0) {
            errors.description = 'Description is required';
        }
        if (project.budget === 0) {
            errors.budget = 'Budget must be more then $0.';
        }
        return errors;
    }

    function isValide (){
        return (
            errors.name.length === 0 &&
            errors.description.length === 0 &&
            errors.budget.length === 0
        );
    }

    return(
        <form class="input-group vertical" onSubmit={handleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input type="text" name="name" placeholder="enter name" value={project.name} onChange={handleChange} />
            {errors.name.length > 0 && (
                <div className="card error"><p>{errors.name}</p></div>
            )}

            <label htmlFor="description">Project Description</label>
            <textarea name="description" placeholder="enter description" value={project.description} onChange={handleChange} />
            {errors.description.length > 0 && (
                <div className="card error"><p>{errors.description}</p></div>
            )}

            <label htmlFor="budget">Project Budget</label>
            <input type="number" name="budget" placeholder="enter budget" value={project.budget} onChange={handleChange} />
            {errors.budget.length > 0 && (
                <div className="card error"><p>{errors.budget}</p></div>
            )}

            <label htmlFor="isActive">Active?</label>
            <input type="checkbox" name="isActive" checked={project.isActive} onChange={handleChange} />

            <div class="input-group">
                <button class="primary bordered medium">Save</button>
                <span></span>
                <button type="button" class="bordered medium" onClick={onCancel}>
                    cancel
                </button>
            </div>
        </form>
    );
}

ProjectForm.propTypes = {
    project: PropTypes.instanceOf(Project),
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
};

export default ProjectForm;