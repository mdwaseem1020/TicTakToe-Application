import React, { useState, useEffect } from 'react';

const File1 = () => {
    const [cells, setCells] = useState(Array(9).fill("")); // 9 cells for a 3x3 grid

    const handleSingleClick = (index) => {
        if (cells[index] === "") { // Only allow setting "X" if the cell is empty
            let newCells = [...cells];
            newCells[index] = "X";
            setCells(newCells);
        }
    };

    const handleDoubleClick = (index) => {
        if (cells[index] === "") { // Only allow setting "O" if the cell is empty
            let newCells = [...cells];
            newCells[index] = "O";
            setCells(newCells);
        }
    };

    const checkWinner = () => {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        for (let [a, b, c] of winningCombinations) {
            if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
                alert(`Winner: ${cells[a]}`);
                setCells(Array(9).fill("")); // Reset board
                return;
            }
        }
        
        if (cells.every(cell => cell !== "")) {
            alert("It's a draw!");
            setCells(Array(9).fill("")); // Reset board
        }
    };

    useEffect(() => {
        checkWinner();
    }, [cells]);

    return (
        <div>
            <table border={1} style={{ borderCollapse: 'collapse', width: '150px', height: '150px' }}>
                <tbody>
                    {[0, 1, 2].map(row => (
                        <tr key={row}>
                            {[0, 1, 2].map(col => {
                                const index = row * 3 + col;
                                return (
                                    <td 
                                        key={index} 
                                        onClick={() => handleSingleClick(index)} 
                                        onDoubleClick={() => handleDoubleClick(index)}
                                        style={{ textAlign: 'center', fontSize: '24px', cursor: 'pointer', width: '50px', height: '50px' }}
                                    >
                                        {cells[index]}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default File1;
