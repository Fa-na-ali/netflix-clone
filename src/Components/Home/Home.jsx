import React, { useEffect, useState } from 'react'
import './Home.scss'
import axios from "axios";
import { Link } from 'react-router-dom';
import { BiPlay } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";

const apiKey = "b1f627488fd4f46c70c5ac7399d35631";
const url = "https://api.themoviedb.org/3/";
const imgUrl = "https://image.tmdb.org/t/p/original";
const upcoming = "upcoming";
const nowPlaying = "now_playing";
const popular = "popular";
const topRated = "top_rated";

const Card = ({ img }) => (
  <img className='card' src={img} alt="cover" />
)

const Row = ({ title, arr = [] }) => (
  <div className='row'>
    <h2>{title}</h2>
    <div>
      {
        arr.map((item, index) => (
          <Card key={index} img={`${imgUrl}/${item.poster_path}`} />
        ))
      }

    </div>
  </div>
)
const Home = () => {

  const [upComingMovie, setupComingMovie] = useState([]);
  const [nowPlayingMovie, setnowPlayingMovie] = useState([]);
  const [popularMovie, setpopularMovie] = useState([]);
  const [topRatedMovie, settopRatedMovie] = useState([]);
  const [genre, setgenre] = useState([]);

  useEffect(() => {
    const fetchUpComing = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${upcoming}?api_key=${apiKey}`)
      setupComingMovie(results);
    }

    const fetchNowPlaying = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${nowPlaying}?api_key=${apiKey}`)
      setnowPlayingMovie(results);
    }

    const fetchPopular = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${popular}?api_key=${apiKey}`)
      setpopularMovie(results);

    }
    const fetchTopRated = async () => {
      const { data: { results } } = await axios.get(`${url}/movie/${topRated}?api_key=${apiKey}`)
      settopRatedMovie(results);
    }

    const getAllGenre = async () => {
      const { data: { genres } } = await axios.get(`${url}/genre/movie/list?api_key=${apiKey}`)
      setgenre(genres);

    }
    getAllGenre();
    fetchUpComing();
    fetchNowPlaying();
    fetchPopular();
    fetchTopRated();
  }, [])

  return (
    <section className='home'>
      <div className='banner' style={{
        backgroundImage: popularMovie[0] ? `url(${`${imgUrl}/${popularMovie[0].poster_path}`})` : '$bg:rgb(16,16,16)'
      }}>
        {
          popularMovie[0] && (
            <h1>{popularMovie[0].original_title}</h1>
          )

        }
        {
          popularMovie[0] && (
            <p>{popularMovie[0].overview}</p>
          )
        }
        <div>
          <button> <BiPlay />  Play </button>
          <button>My List  <AiOutlinePlus /> </button>
        </div>


      </div>

      <Row title={"Upcoming "} arr={upComingMovie} />
      <Row title={"Now Playing "} arr={nowPlayingMovie} />
      <Row title={"Popular "} arr={popularMovie} />
      <Row title={"Top Rated"} arr={topRatedMovie} />

      <div className="genreBox">
        {genre.map((item) => (
          <Link key={item.id} to={`/genre/${item.id}`}>{item.name}</Link>
        ))}

      </div>

    </section>
  )
}

export default Home