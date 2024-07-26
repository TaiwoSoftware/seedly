export default function FormInput({ type, connect, inputStyles, label, mainValue,handleChange }) {
  return (
    <>
      <div className="mt-4">
        <label htmlFor={connect} className=" text-[#353535] font-bold">
          {label}
        </label>
        <input type={type} required value={mainValue} onChange={handleChange} className={inputStyles} id={connect} />
      </div>
    </>
  );
}
