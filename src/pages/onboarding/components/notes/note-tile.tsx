const NoteTile = () => {
  return (
    <div className="flex items-center space-x-2">
      <input type="radio" className="w-8 h-8" />
      <label>
        <span className="text-lg font-semibold italic block">
          This is a Note
        </span>
        <span className="text-sm italic block">
          10th sep 2022 16:30 I Account
        </span>
      </label>
    </div>
  )
} // End of NoteTile

export default NoteTile
