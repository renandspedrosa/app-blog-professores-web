const Input = ({ value, onChange, onKeyDown }) => {
  return (
    <input
      id="search"
      type="text"
      className="border-0 outline-slate-400 px-4 py-2 pl-10 pr-0 rounded-l-md w-full"
      value={value}
      onChange={onChange}
      placeholder="Buscar por postagens"
      onKeyDown={onKeyDown}
    />
  )
}

export default Input;