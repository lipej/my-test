import { UseFormRegisterReturn } from "react-hook-form";

type Params = {
  prop: string;
  register?: UseFormRegisterReturn;
  error?: string | null;
  name?: string;
  field?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
};

export default function Input({
  prop,
  register,
  error,
  name,
  value,
  field,
  type = "text",
  disabled = false
}: Params) {
  return (
    <div className='form-control max-w-xs w-[250px]'>
      
        <label className='label'>
        {name && (<span className='label-text'>Digite seu {name}</span>)} 
        {field && (<span className='label-text'>{field}</span>)} 
        </label>
      
      <input
        type={type}
        placeholder='Type here'
        className={`input input-bordered w-full ${
          error ? "input-bordered input-error" : ""
        }`}
        id={prop}
        value={value}
        {...register}
        disabled={disabled}
      />
      {error && (
        <label className='label'>
          <span className='label-text-alt text-red-400	'>{error}</span>
        </label>
      )}
    </div>
  );
}
