// // eslint-disable-next-line no-unused-vars
// import React, { useEffect, useState } from 'react';

// import WorkoutDetails from '../../components/WorkoutDetails/WorkoutDetails';
// import WorkoutForm from '../WorkoutForm/WorkoutForm';

// const Home = () => {
//     const [workouts, setWorkouts] = useState(null);

//     useEffect(() => {
//         const fetchWorkouts = async () => {
//             try {
//                 const response = await fetch('http://localhost:4000/api/workout');
//                 const json = await response.json();
//                 console.log("Fetched workouts:", json); // Debugging log
//                 if (response.ok) {
//                     setWorkouts(json);
//                 } else {
//                     console.error("API response not OK:", json);
//                 }
//             } catch (error) {
//                 console.error("Error fetching workouts:", error);
//             }
//         };

//         fetchWorkouts();
//     }, []);


//     return (
//         <div className="min-h-screen bg-gray-100 py-10">
//             <div className="container mx-auto px-4">
//                 <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//                     Your Workouts
//                 </h1>
//                 <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
//                     {workouts &&
//                         workouts.map((workout) => (
//                             <WorkoutDetails key={workout._id} workout={workout} />

//                         ))}
//                 </div>
//             </div>
//             <WorkoutForm />
//         </div>

//     );
// };

// export default Home;
// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useWorkoutsContext } from '../../Hooks/UseWorkoutContext';
import WorkoutDetails from '../../Components/WorkoutDetails/WorkoutDetails';
import WorkoutForm from '../../components/WorkoutForm/WorkoutForm';
import { useAuthContext } from '../../Hooks/useAuthContext';

const Home = () => {
  const {workouts, dispatch} = useWorkoutsContext();
  const {user}=useAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const response = await fetch( 'http://localhost:4000/api/workout',{
          headers:{
            "Authorization":`Bearer ${user.token}`
          }
        });
        
        const json = await response.json();
        console.log("Fetched workouts:", json); // Debugging log

        if (response.ok) {
          dispatch({ type: 'SET_WORKOUTS', payload: json });
        }

      } catch (error) {
        console.error("Error fetching workouts:", error);
      }
    };
  
    fetchWorkouts();
  }, []);
  

  return (
    <div className="min-h-screen bg-gray-100 py-10">
  <div className="container mx-auto px-4">
    <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
      Your Workouts
    </h1>
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Left Side: Workout Details */}
      <div className="flex-1 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {workouts &&
          workouts.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>

      {/* Right Side: Workout Form */}
      <div className="w-full lg:w-1/3">
        <WorkoutForm />
      </div>
    </div>
  </div>
</div>

  );
};

export default Home;