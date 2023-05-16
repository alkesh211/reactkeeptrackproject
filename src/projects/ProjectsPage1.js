import React, { Fragment, useState, useEffect } from "react";
import ProjectList from './ProjectList';
import { projectAPI } from "./projectAPI1";
import { Project } from "./Project";

function ProjectsPage() {
    const [projects, setProjects] = useState({ Project });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(undefined);

    useEffect(() => {
        async function loadProjects() {
            setLoading(true);
            try {
                const data = await projectAPI.get(1);
                setError(null);
                setProjects(data);
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        }
        loadProjects();
    }, []);

    const saveProject = (project) => {
        let updatedProjects = projects.map((p) => {
            return p.id === project.id ? project : p;
        });
        setProjects(updatedProjects);
    };

    return (
        <Fragment>
            <h1>Projects</h1>
            {error && (
                <div className="row">
                    <div className="card large error">
                        <section>
                            <p>
                                <span className="icon-alert inverse"></span>
                                {error}
                            </p>
                        </section>
                    </div>
                </div>
            )}
            <ProjectList onSave={saveProject} projects={projects} />
            {loading && (
                <div className="center-page">
                    <span className="spinner primary"></span>
                    <p>Loading...</p>
                </div>
            )}
        </Fragment>
    );
}

export default ProjectsPage;