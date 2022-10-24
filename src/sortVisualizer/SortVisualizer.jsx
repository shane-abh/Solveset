import React, { useState, useEffect, useRef } from 'react';
import './SortVisualizer.css';
import { getQuickSortAnimations } from '../algorithms/QuickSort';
import { getInsertionSortAnimations } from '../algorithms/InsertionSort';
import { getMergeSortAnimations } from '../algorithms/MergeSort';
import { getBubbleSortAnimations } from '../algorithms/BubbleSort';


const ARR_LEN = 80;
const MIN_NUM = 5;
const MAX_NUM = 600;
const DELAY = 5;
const ACCESSED_COLOUR = 'turquoise';
const SORTED_COLOUR = '#36F213';

export default function SortVisualizer(props) {
  const [arr, setArr] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [isSorted, setIsSorted] = useState(false);
  const [timeDiff , setTimeDiff] = useState(0);
  const containerRef = useRef(null);

  useEffect(initializeArray, []);

  function initializeArray() {
    if (isSorting) return;
    if (isSorted) resetArrayColour();
    setIsSorted(false);
    setTimeDiff(0.00);
    const arr = [];
    for (let i = 0; i < ARR_LEN; i++) {
      arr.push(Math.floor(Math.random() * 596 + 5 ));
    }
    // shuffle(arr);
    setArr(arr);
  }

  function mergeSort() {
    const animations = getMergeSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function insertionSort() {
    const animations = getInsertionSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function quickSort() {
    const animations = getQuickSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  function bubbleSort(){
    const animations = getBubbleSortAnimations(arr);
    animateArrayUpdate(animations);
  }

  var startTime, endTime;

  function animateArrayUpdate(animations) {
    if (isSorting) return;
    setIsSorting(true);
    
    startTime = new Date()/1000;  
    // console.log(animations)

    // Comparision is the array,
    // swapped is true/false 
    animations.forEach(([comparison, swapped], index) => {
      setTimeout(() => {
        // console.log('comparison: ' + comparison + ' swapped: ' + swapped + ' index: ' + index)
        if (!swapped) {
          if (comparison.length === 2) {
            const [i, j] = comparison;
            animateArrayAccess(i);
            animateArrayAccess(j);
          } else {
            const [i] = comparison;
            animateArrayAccess(i);
          }
        } else {
          setArr((prevArr) => {
            const [k, newValue] = comparison;
            const newArr = [...prevArr];
            newArr[k] = newValue;
            return newArr;
          });
        }
      }, index * DELAY);
    });
    setTimeout(() => {
      animateSortedArray();
    }, animations.length * DELAY);
  }

  function animateArrayAccess(index) {
    const arrayBars = containerRef.current.children;
    
    const arrayBarStyle = arrayBars[index].style;
    setTimeout(() => {
      arrayBarStyle.backgroundColor = 'red';
    }, DELAY);
    setTimeout(() => {
      arrayBarStyle.backgroundColor = ACCESSED_COLOUR;
    }, DELAY * 2);
  }

  function animateSortedArray() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arrayBars.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      setTimeout(
        () => (arrayBarStyle.backgroundColor = SORTED_COLOUR),
        i * DELAY,
      );
    }
    setTimeout(() => {
      setIsSorted(true);
      setIsSorting(false);
      
    }, arrayBars.length * DELAY);
    endTime = new Date()/1000
    
    setTimeDiff((endTime - startTime));
  }

  function resetArrayColour() {
    const arrayBars = containerRef.current.children;
    for (let i = 0; i < arr.length; i++) {
      const arrayBarStyle = arrayBars[i].style;
      arrayBarStyle.backgroundColor = '';
    }
  }

  return (
    <div className="visualizer-container">
      <header className="app-header">
        <div style={{float: "left", width: '30%', marginLeft: 10}} className="logo">
          
          <img src="https://cdn-icons-png.flaticon.com/512/5541/5541640.png" width={40} id="logo"/>
          <label className="lbl">SolveSet</label>
        </div>
        
        <ul>
          <li>
            <button className="app-button" onClick={initializeArray}>
              Create new array
            </button>
          </li>
          <li>
            <button className="app-button" onClick={mergeSort}>
              Merge sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={insertionSort}>
              Insertion sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={quickSort}>
              Quick sort
            </button>
          </li>
          <li>
            <button className="app-button" onClick={bubbleSort}>
              Bubble sort
            </button>
          </li>
        </ul>
      </header>

      <div className="array-container" ref={containerRef}>
        {arr.map((barHeight, index) => (
          <div
            className="array-bar"
            style={{
              height: `${barHeight}px`,
              // width: `${100 / ARR_LEN}vw`,
            }}
            key={index}
          ></div>
        ))}

        <div className='time-tracker'>
            <h1>Time taken</h1>
            <h2>{timeDiff.toFixed(2)}s</h2>
        </div>
        
      </div>
      
    </div>
  );
}

const shuffle = (arr) => {
  for (let i = arr.length - 1; i >= 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[randomIndex];
    arr[randomIndex] = temp;
  }
};
