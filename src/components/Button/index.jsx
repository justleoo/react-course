import './styles.css';

export default function Button({ text, onClick, disabled }) {
    return (
        <button className='button'
         onClick={onClick}
         disabled={disabled}>
            {text}
        </button>
    );
};