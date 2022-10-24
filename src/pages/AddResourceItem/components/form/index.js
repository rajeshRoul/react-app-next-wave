import Button from "components/Button";
import TextArea from "components/TextArea";
import TextField from "components/TextField";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResourceAPI from "ServerConnect/ResourceAPI";
import classes from "./form.module.scss";

const AddResourceItemForm = () => {
    const [itemName, setItemName] = useState("");
    const [link, setLink] = useState("");
    const [resourceName, setResourceName] = useState("");
    const [description, setDescription] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // GET APIs Don't support sending payload in body. As per REST, GET API's can Only accept parameters in the url
        const payload = {
            itemName : itemName.trim(),
            link: link.trim(),
            resourceName: resourceName.trim(),
            description: description.trim()
        }
        const res = await ResourceAPI.createResourceItem(payload);
        if(res){
            navigate("/resources");
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className={classes.container}>
                <div className={classes.formHeading}>
                    Item Details
                </div>
                <TextField
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    required={true}
                    label="ITEM NAME"
                    maxLength={30}
                    pattern="^[^ ].+[^ ]$"
                    placeholder="Enter Item Name" />
                <TextField
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    required={true}
                    type="url"
                    label="LInk"
                    pattern="^[^ ].+[^ ]$"
                    maxLength={50}
                    placeholder="Enter Link" />
                <TextField
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                    required={true}
                    label="Resource Name"
                    maxLength={30}
                    pattern="^[^ ].+[^ ]$"
                    placeholder="Enter Resource Name" />
                <TextArea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required={true}
                    label="Descrition"
                    pattern="^[^ ].+[^ ]$"
                    maxLength={250}
                    placeholder="Enter Descrition" />
                <Button
                    type="submit"
                    style={{ marginTop: 16 }}>
                    Create
                </Button>
            </div>
        </form>
    )
}

export default AddResourceItemForm