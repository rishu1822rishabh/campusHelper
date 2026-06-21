import React from 'react'

const Weakness = ({analysisweakness}) => {
  return (
      <div className="bg-gray-800 rounded-xl p-6 w-[400px]">
          <h3 className="text-red-400 text-xl mb-4">
              ⚠ Weaknesses
          </h3>

          <ul className="space-y-3">
              {analysisweakness.map((item, index) => (
                  <li
                      key={index}
                      className="bg-red-500/10 border border-red-500/20 rounded-lg p-3"
                  >
                      {item}
                  </li>
              ))}
          </ul>
      </div>
  )
}

export default Weakness;