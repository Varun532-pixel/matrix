function MatrixGame() {
    const [boxes, setBoxes] = React.useState(
        Array(9).fill(null).map((_, i) => ({
            id: i,
            color: null,
            clickOrder: null
        }))
    );
    const [clickSequence, setClickSequence] = React.useState([]);
    const [isAnimating, setIsAnimating] = React.useState(false);

    const handleBoxClick = (id) => {
        if (isAnimating) return;

        const boxIndex = boxes.findIndex(box => box.id === id);
        const isAlreadyColored = boxes[boxIndex].color !== null;
        
        if (!isAlreadyColored) {
            const newBoxes = boxes.map(box => 
                box.id === id 
                    ? { ...box, color: 'green', clickOrder: clickSequence.length }
                    : box
            );
            
            const newSequence = [...clickSequence, id];
            
            setBoxes(newBoxes);
            setClickSequence(newSequence);

            if (newSequence.length === 9) {
                animateToOrange(newSequence);
            }
        }
    };

    const animateToOrange = (sequence) => {
        setIsAnimating(true);
        let delay = 0;
        
        sequence.forEach((id, index) => {
            setTimeout(() => {
                setBoxes(prevBoxes => {
                    return prevBoxes.map(box => 
                        box.id === id ? { ...box, color: 'orange' } : box
                    );
                });

                if (index === sequence.length - 1) {
                    setTimeout(resetGame, 1000);
                }
            }, delay);
            
            delay += 500;
        });
    };

    const resetGame = () => {
        setBoxes(Array(9).fill(null).map((_, i) => ({
            id: i,
            color: null,
            clickOrder: null
        })));
        setClickSequence([]);
        setIsAnimating(false);
    };

    return (
        <div className="container">
            <h2>3x3 Matrix Game</h2>
            <div className="grid">
                {boxes.map((box) => (
                    <div
                        key={box.id}
                        onClick={() => handleBoxClick(box.id)}
                        className="box"
                        style={{
                            backgroundColor: box.color || '#eee',
                            cursor: box.color ? 'default' : 'pointer'
                        }}
                    >
                        {box.clickOrder !== null && box.clickOrder + 1}
                    </div>
                ))}
            </div>
        </div>
    );
}

ReactDOM.render(<MatrixGame />, document.getElementById('root'));