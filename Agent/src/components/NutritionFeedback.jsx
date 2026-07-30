import ReactMarkdown from 'react-markdown';

const NutritionFeedback = ({ feedback }) => {
  return (
    <div className="nutrition-feedback" style={{ textAlign: 'left', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px', backgroundColor: '#f9f9f9', color: '#333' }}>
      <ReactMarkdown>{feedback}</ReactMarkdown>
    </div>
  );
};

export default NutritionFeedback;
