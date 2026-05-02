const GenderCheckbox = ({ onCheckboxChange, selectedGender }) => {
  return (
    <div className="flex gap-4">
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer p-0`}>
          <input
            type="checkbox"
            className="checkbox checkbox-sm rounded-full border-gray-500 checked:border-[#5865F2] checked:bg-[#5865F2]"
            checked={selectedGender === "male"}
            onChange={() => onCheckboxChange("male")}
          />
          <span className="text-sm text-gray-300">Male</span>
        </label>
      </div>
      <div className="form-control">
        <label className={`label gap-2 cursor-pointer p-0`}>
          <input
            type="checkbox"
            className="checkbox checkbox-sm rounded-full border-gray-500 checked:border-[#5865F2] checked:bg-[#5865F2]"
            checked={selectedGender === "female"}
            onChange={() => onCheckboxChange("female")}
          />
          <span className="text-sm text-gray-300">Female</span>
        </label>
      </div>
    </div>
  );
};
export default GenderCheckbox;
