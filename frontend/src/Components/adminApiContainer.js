import { useState } from "react";
import { useNavigate } from "react-router-dom";
import '../Styling/adminApiContainer.css';

const AdminApiContainer = () => {
    // State variables
    const [id, idchange] = useState('');
    const [icon, iconchange] = useState('');
    const [title, titlechange] = useState('');
    const [description, descriptionchange] = useState('');
    const [endpoints, endpointschange] = useState([{ name: '', description: '', value: '' }]);
    const [website, websitechange] = useState('');

    const navigate = useNavigate();

    // Handle form submission
    const handlesubmit = (e) => {
        e.preventDefault();
        const data = { title, description, endpoints, website };

        fetch("http://localhost:5000/admin/login/create_category", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(() => {
            alert('Category added successfully!');
            navigate(-1);
        })
        .catch((err) => alert('Error: ' + err.message));
    };

    // Handle endpoint changes
    const handleEndpointChange = (index, e) => {
        const newEndpoints = [...endpoints];
        newEndpoints[index][e.target.name] = e.target.value;
        endpointschange(newEndpoints);
    };

    // Add a new endpoint
    const addEndpoint = () => {
        endpointschange([...endpoints, { name: '', description: '', value: '' }]);
    };

    // Remove an endpoint
    const removeEndpoint = (index) => {
        const newEndpoints = endpoints.filter((_, i) => i !== index);
        endpointschange(newEndpoints);
    };

    return (
        <div>
            <form className="container" onSubmit={handlesubmit}>
                <div className="row">
                    <div className="col-lg-6 offset-lg-3">
                        <h3>Add/Edit API Category</h3>

                        <div className="form-group">
                            <label>Title</label>
                            <input
                                value={title}
                                onChange={e => titlechange(e.target.value)}
                                className="form-control"
                                type="text"
                                placeholder="Category Title"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <textarea
                                value={description}
                                onChange={e => descriptionchange(e.target.value)}
                                className="form-control"
                                rows="3"
                                placeholder="Category Description"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Endpoints</label>
                            {endpoints.map((endpoint, index) => (
                                <div key={index} className="endpoint-group">
                                    <input
                                        name="name"
                                        value={endpoint.name}
                                        onChange={(e) => handleEndpointChange(index, e)}
                                        placeholder="Endpoint Name"
                                        className="form-control"
                                    />
                                    <input
                                        name="description"
                                        value={endpoint.description}
                                        onChange={(e) => handleEndpointChange(index, e)}
                                        placeholder="Endpoint Description"
                                        className="form-control"
                                    />
                                    <input
                                        name="value"
                                        value={endpoint.value}
                                        onChange={(e) => handleEndpointChange(index, e)}
                                        placeholder="Endpoint Value"
                                        className="form-control"
                                    />
                                    <button
                                        type="button"
                                        className="btn btn-danger"
                                        onClick={() => removeEndpoint(index)}
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn btn-primary"
                                onClick={addEndpoint}
                            >
                                Add Endpoint
                            </button>
                        </div>
                        <div className="form-group">
                            <label>Website</label>
                            <input
                                value={website}
                                onChange={e => websitechange(e.target.value)}
                                className="form-control"
                                type="text"
                                placeholder="Website URL"
                            />
                        </div>
                        <div className="form-group">
                            <br />
                            <button className="btn btn-success" type="submit">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AdminApiContainer;
