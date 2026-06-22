import React from 'react'
interface needtoimproveProps {
    analysisneedtoimprove: string[];
}

const Improvement = ({analysisneedtoimprove}:needtoimproveProps) => {
  return (
      <div className="bg-gray-800 rounded-xl p-6 w-175">
          <h3 className="text-yellow-400 text-xl mb-4">
              🚀 Need To Improve
          </h3>

          <ul className="space-y-3">
              {analysisneedtoimprove.map((item, index) => (
                  <li
                      key={index}
                      className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-3"
                  >
                      {item}
                  </li>
              ))}
          </ul>
      </div>
  )
}

export default Improvement