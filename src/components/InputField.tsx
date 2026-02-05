type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export default function InputField(props: InputFieldProps) {

  console.log(props.value);
  return (
    <input
      {...props}
      type="text"
      className="
        bg-neutral-grey-200 no-spinner
        text-2xl text-right text-neutral-green-900 
        p-3 pl-8 w-full rounded-sm focus-visible:outline-primary-green-400"
    />
  )
}