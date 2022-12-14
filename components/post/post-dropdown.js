import { Dropdown } from "flowbite-react";
import { AiOutlineDelete } from "react-icons/ai";
import { BsThreeDotsVertical } from "react-icons/bs";

const PostDropDown = props => {
  let dropdownText = "Delete";

  if (props.loadingState === "LOADING") dropdownText = "Loading";
  if (props.loadingState === "SUCCESS") dropdownText = "Success";
  if (props.loadingState === "ERROR") dropdownText = "Error!";

  return (
    <Dropdown
      label={<BsThreeDotsVertical className="text-2xl" />}
      dismissOnClick={false}
      color="inherite"
      arrowIcon={false}
    >
      <Dropdown.Item onClick={props.onDeleltePost}>
        {dropdownText} <AiOutlineDelete className="ml-2" />
      </Dropdown.Item>
    </Dropdown>
  );
};

export default PostDropDown;
