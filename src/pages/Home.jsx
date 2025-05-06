import { useEffect, useState } from "react";
import Header from "../components/Header";
import QuizCard from "../components/QuizCard/QuizCard";
import OffCanvas from "../components/OffCanvas/OffCanvas";
import { Button } from "react-bootstrap";
import Filtragem from "../components/Filtragem/Filtragem";
import NavPagination from "../components/NavPagination";
import posts from '../data/quizzes.json'

export default function Home() {
	const [quizzes, setQuizzes] = useState([])
	const [filtros, setFiltros] = useState([])


	useEffect(() => {

		setQuizzes(posts)
	}, [])

	// Paginação
	const [currentPage, setCurrentPage] = useState(1);
	const postsPerPage = 12;
	const indexOfLastPost = currentPage * postsPerPage;
	const indexOfFirstPost = indexOfLastPost - postsPerPage;
	const currentPosts = quizzes.slice(indexOfFirstPost, indexOfLastPost);

	return (
		<>
			<Header />
			<div className="d-flex flex-wrap justify-content-evenly mt-4 col-12">

				<div className="d-flex justify-content-between col-11 px-2">
					<Button className="d-xl-none rounded-pill px-4 float-start fw-medium">
						<i className="fa fa-plus me-2"></i>Criar Quiz
					</Button>

					<OffCanvas button='Filtros' titulo='Filtrar Quizzes'>
						<Button className=" rounded-pill mt-3 mb-4 px-4 mx-auto fw-medium">
							<i className="fa fa-plus me-2"></i>Criar Quiz
						</Button>

						<Filtragem setFiltros={setFiltros} filtros={filtros} />
					</OffCanvas>
				</div>


				<section className="d-flex flex-wrap col-11 col-xl-9 row-gap-3 mt-4">
					{currentPosts.map((quiz, key) => (
						<QuizCard key={key} quiz={quiz} />
					))}
				</section>


				<aside className="d-none d-xl-flex flex-column border border-dark-subtle rounded-4 h-100 mt-4 pt-3" style={{ width: "21%" }} id='asideDiv'>

					<div className="d-flex flex-column bg-white">
						<Button className="mx-auto rounded-pill my-4 px-4 fw-medium">
							<i className="fa fa-plus me-2"></i>Criar Quiz
						</Button>

						<hr className="mb-0 pt-0" />
						<h6 className="ps-3 py-2 mb-0 text-bg-light ">Filtrar</h6>
						<hr className="my-0 py-0" />
					</div>

					<Filtragem className="d-none d-xl-flex" id='asideFilter' setFiltros={setFiltros} filtros={filtros} />
				</aside>
			</div>

			<NavPagination
				postsPerPage={postsPerPage}
				totalPosts={quizzes.length}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				className='d-flex justify-content-center mt-4 pt-4 col-12'
			/>
		</>
	)
}