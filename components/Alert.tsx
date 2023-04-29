function Alert({ title, msg }: any) {
  return (
    <div className="bg-primary-100 border-t border-b border-primary-500 text-primary-700 px-4 py-3">
      <div className="font-bold">{title}</div>
      <div className="text-sm">{msg}</div>
    </div>
  );
}

export default Alert;
