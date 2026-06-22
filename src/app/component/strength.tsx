import React from 'react'
interface strengthsProps {
    analysisstrength : string[];
}

const Strength = ({analysisstrength}:strengthsProps) => {
  return (
      <div className="bg-gray-800 rounded-xl p-6 w-100">
          <h3 className="text-green-400 text-xl mb-4">
              💪 Strengths
          </h3>

          <ul className="space-y-3">
              {analysisstrength.map((item, index) => (
                  <li
                      key={index}
                      className="bg-green-500/10 border border-green-500/20 rounded-lg p-3"
                  >
                      ✓ {item}
                  </li>
              ))}
          </ul>
      </div>
  )
}

export default Strength;