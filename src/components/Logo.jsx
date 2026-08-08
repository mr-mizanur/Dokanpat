export default function Logo() {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      <div className="flex flex-col">
        <span className="text-xl font-black tracking-wider text-slate-900 leading-tight">
          Dokan<span className="text-orange-600">pat</span>
        </span>
        <span className="text-xs font-bold tracking-wide text-orange-600">
          দোকানপাট
        </span>
      </div>
    </div>
  );
}