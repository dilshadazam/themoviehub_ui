import React, { useState, useEffect } from "react";

import ReactLoading from "react-loading";
import baseUrl from "../api/baseurl";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [datares, setDatares] = useState({ data: [] });

  useEffect(() => {
    getMovieList();
  }, []);

  const getMovieList = async () => {
    setIsLoading(true);
    try {
      const response = await baseUrl.get(`/admin/movielist`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setDatares(response.data);
        setIsLoading(false);
      }
    } catch (error) {
      console.error(error);
      swal(error.response.data.message);
      setIsLoading(false);
    }
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= rating; i++) {
      stars.push(
        <FontAwesomeIcon icon={faStar} key={i} style={{ color: "gold" }} />
      );
    }
    return stars;
  };

  return (
    <>
      <div className="background-container">
        <section className="sticky top-0 bg-blue-900 py-2 mb-1 w-full">
          <div className="mx-auto container">
            <a
              className="text-gold hover:text-white"
              href="https://www.linkedin.com/in/md-dilshad/?original_referer=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2F&originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
            >
              {" "}
              <h1 className="mx-auto flex justify-center uppercase text-white text-2xl font-semibold">
                Cinepolis PVR Bangalore
              </h1>
            </a>
          </div>
        </section>
        {isLoading ? (
          <div className="flex items-center justify-center my-10">
            <ReactLoading
              type="spin"
              color="#0143E2"
              height={"10%"}
              width={"8%"}
            />
          </div>
        ) : (
          <div className="container mx-auto mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {datares.data.map((movie) => (
                <div key={movie.id} className="movie-card">
                  <div className="card-content">
                    <h2
                      className="text-xl font-semibold mb-2"
                      style={{ fontFamily: "Your Desired Font, sans-serif" }}
                    >
                      {movie.moviename}
                    </h2>
                    <p style={{ fontFamily: "Your Desired Font, sans-serif" }}>
                      Rating: {renderRatingStars(movie.rating)}
                    </p>
                    <p style={{ fontFamily: "Your Desired Font, sans-serif" }}>
                      Release Date: {movie.releasedate}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <footer className="bg-blue-900 text-white py-4">
        <div className="container mx-auto">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Made By Dilshad{" "}
            <a
              className="text-gold hover:text-white"
              href="https://www.linkedin.com/in/md-dilshad/?original_referer=https%3A%2F%2Fwww%2Elinkedin%2Ecom%2F&originalSubdomain=in"
              target="_blank"
              rel="noopener noreferrer"
            >
              - Know more about me{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6 inline-block align-middle"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.042 21.672L13.684 16.6m0 0l-2.51 2.225.569-9.47 5.227 7.917-3.286-.672zm-7.518-.267A8.25 8.25 0 1120.25 10.5M8.288 14.212A5.25 5.25 0 1117.25 10.5"
                />
              </svg>
            </a>
          </p>
        </div>
      </footer>
    </>
  );
};

export default Dashboard;
