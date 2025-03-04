export default function TailwindTest() {
  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4" style={{ color: '#3b82f6' }}>Tailwind Test</h1>
      
      <div className="flex space-x-4 mb-4">
        <div className="w-16 h-16 rounded-md" style={{ backgroundColor: '#ef4444' }}></div>
        <div className="w-16 h-16 rounded-md" style={{ backgroundColor: '#10b981' }}></div>
        <div className="w-16 h-16 rounded-md" style={{ backgroundColor: '#3b82f6' }}></div>
        <div className="w-16 h-16 rounded-md" style={{ backgroundColor: '#eab308' }}></div>
        <div className="w-16 h-16 rounded-md" style={{ backgroundColor: '#8b5cf6' }}></div>
      </div>
      
      <p style={{ color: '#ef4444' }} className="font-bold">Red text</p>
      <p style={{ color: '#10b981' }} className="font-bold">Green text</p>
      <p style={{ color: '#3b82f6' }} className="font-bold">Blue text</p>
      
      <div className="mt-4">
        <span className="inline-block px-4 py-2 text-white rounded-md" 
              style={{ backgroundColor: '#3b82f6' }}>
          Blue Button
        </span>
        <span className="inline-block ml-2 px-4 py-2 text-white rounded-md" 
              style={{ backgroundColor: '#ef4444' }}>
          Red Button
        </span>
      </div>
    </div>
  );
}
