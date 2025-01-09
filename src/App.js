import React, { useState } from "react";
import { useSpring, animated } from "react-spring";
import "./styles.css";

const App = () => {
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [tasksVisible, setTasksVisible] = useState(false);
  const [onboarding, setOnboarding] = useState(true);
  const [tasks, setTasks] = useState([
    { id: 1, name: "Log Water Intake", category: "Physical", completed: false },
    {
      id: 2,
      name: "Walking for 30 Minutes",
      category: "Physical",
      completed: false,
    },
    { id: 3, name: "Morning Exercise", category: "Physical", completed: false },
    {
      id: 4,
      name: "Meditation for 10 Minutes",
      category: "Mental",
      completed: false,
    },
    {
      id: 5,
      name: "Journaling for 5 Minutes",
      category: "Mental",
      completed: false,
    },
    { id: 6, name: "Control Emotions", category: "Mental", completed: false },
    {
      id: 7,
      name: "Step Challenge",
      description: "Walk 12000 steps today",
      completed: false,
      category: "Social",
    },
    {
      id: 8,
      name: "Marathon Challenge",
      description: "Participate in a marathon today",
      completed: false,
      category: "Social",
    },
  ]);

  const handleButtonClick = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setTasksVisible(true);
    }, 2000);
  };

  const handleGoBack = () => {
    setTasksVisible(false);
  };

  const handleSwipeComplete = (taskId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
    setSuccess(taskId);
    setTimeout(() => setSuccess(""), 2000);
  };

  const closeOnboarding = () => {
    setOnboarding(false);
  };

  return (
    <div className="app-container">
      <h1>Wellness App</h1>
      <div className="motivational-quotes">
        <p>
          "Health is a state of complete harmony of the body, mind, and spirit."
        </p>
        <p>
          "Physical fitness is the first requisite of happiness." - Joseph
          Pilates
        </p>
        <p>
          "Take care of your body, it's the only place you have to live." - Jim
          Rohn
        </p>
      </div>
      {onboarding && (
        <div className="onboarding-main">
          <div className="onboarding-modal">
            <h2>Welcome to the Wellness App!</h2>
            <p>
              Track your daily wellness tasks for physical and mental health.
              Join social challenges with friends to stay motivated!
            </p>
            <button className="onboarding-button" onClick={closeOnboarding}>
              Start Exploring
            </button>
          </div>
        </div>
      )}

      {!tasksVisible && !onboarding && (
        <button className="track-button" onClick={handleButtonClick}>
          Track Activity
        </button>
      )}

      {loading && (
        <div className="loading-animation">
          <div className="loading-circle">
            <div className="orbit"></div>
          </div>
          <p>Fetching your tasks...</p>
        </div>
      )}

      {tasksVisible && (
        <div className="task-list">
          <h2>Today's Wellness Tasks</h2>
          <h4>Swipe tasks to mark as complete/incomplete</h4>
          <div className="category">
            <h3>Physical Health</h3>
            <ul>
              {tasks
                .filter((task) => task.category === "Physical")
                .map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onSwipeComplete={() => handleSwipeComplete(task.id)}
                  />
                ))}
            </ul>
          </div>
          <div className="category">
            <h3>Mental Health</h3>
            <ul>
              {tasks
                .filter((task) => task.category === "Mental")
                .map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onSwipeComplete={() => handleSwipeComplete(task.id)}
                  />
                ))}
            </ul>
          </div>
          <div className="social-challenges">
            <h3>Social Challenges</h3>
            <ul>
              {tasks
                .filter((task) => task.category === "Social")
                .map((task) => (
                  <Task
                    key={task.id}
                    task={task}
                    onSwipeComplete={() => handleSwipeComplete(task.id)}
                  />
                ))}
            </ul>
          </div>
          <button className="go-back-button" onClick={handleGoBack}>
            Go Back
          </button>
        </div>
      )}

      {success && (
        <div
          className={`success-animation ${
            tasks.find((task) => task.id === success).completed
              ? "completed"
              : "incomplete"
          }`}
        >
          <div
            className={
              tasks.find((task) => task.id === success).completed
                ? "confetti"
                : "incomplete-icon"
            }
          ></div>
          <div className="checkmark">
            {tasks.find((task) => task.id === success).completed ? "✓" : "✖"}
          </div>
          <p>
            Task{" "}
            {tasks.find((task) => task.id === success).completed
              ? "Completed"
              : "Incomplete"}
            !
            {tasks.find((task) => task.id === success).completed
              ? " Great job!"
              : " Try again next time!"}
          </p>
        </div>
      )}
    </div>
  );
};

const Task = ({ task, onSwipeComplete }) => {
  const [swipe, setSwipe] = useSpring(() => ({ x: 0 }));

  const handleDrag = (event) => {
    const { clientX } = event;
    setSwipe.start({ x: clientX });
  };

  const handleDragEnd = () => {
    if (swipe.x.get() > 150) {
      onSwipeComplete();
      setSwipe.start({ x: 0 });
    } else {
      setSwipe.start({ x: 0 });
    }
  };

  return (
    <animated.li
      className={`task-item ${task.completed ? "completed" : ""}`}
      style={swipe}
      draggable={!task.completed}
      onDrag={handleDrag}
      onDragEnd={handleDragEnd}
    >
      <span>{task.name}</span>
      {task.description && <p>{task.description}</p>}
      {task.completed && <span className="status">Completed</span>}
    </animated.li>
  );
};

export default App;
