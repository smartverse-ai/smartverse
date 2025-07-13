import React from "react";

type ResultBoxProps = {
  result: string;
};

const ResultBox: React.FC<ResultBoxProps> = ({ result }) => {
  return (
    <div className="bg-gray-100 p-4 rounded-md border border-gray-300 mt-4">
      <h2 className="text-lg font-semibold mb-2">النتيجة:</h2>
      <p className="text-gray-700 whitespace-pre-wrap">{result}</p>
    </div>
  );
};

export default ResultBox;

