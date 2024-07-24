import { faBrain } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const Logo = () => {
  return (
    <div className="text-3xl text-center py-4 ">
      <span className="pr-1 font-heading">AI Blog Gen</span>
      <FontAwesomeIcon
        icon={faBrain}
        className="text-3xl text-center text-slate-400"
      />
    </div>
  );
};
