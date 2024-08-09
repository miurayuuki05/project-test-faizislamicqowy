'use client'
import { useEffect, useState } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FiChevronsRight } from "react-icons/fi";
import { FiChevronLeft } from "react-icons/fi";
import { FiChevronsLeft } from "react-icons/fi";

interface Post {
    id : number;
    title : string;
    content : string;
    image : string;
    tanggal : string;
}

export default function Posts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const [sort, setSort] = useState('latest');
    const [pagination, setPagination] = useState(1);

    const getPosts = async () => {
        const response = await fetch('/dummydata/data.json');
        const data = await response.json();
        setPosts(data);
    }

    const handleSort = (e : any) => {
        setSort(e.target.value);
        console.log(sort);
    }

    const handlePerPage = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPerPage(Number(e.target.value));
        console.log(perPage);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    const getVisiblePages = () => {
        if (totalPages <= 5) {
            return Array.from({ length: totalPages }, (_, i) => i + 1);
        } else if (page <= 3) {
            return [1, 2, 3, 4, 5];
        } else if (page > totalPages - 3) {
            return [totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
        } else {
            return [page - 2, page - 1, page, page + 1, page + 2];
        }
    };

    useEffect(() => {
        getPosts();
        console.log(perPage);
    }, [perPage, sort]);

    const totalPages = Math.ceil(posts.length / perPage);

    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    const currentPosts = posts.slice(startIndex, endIndex);
    const visiblePages = getVisiblePages();

    
    
    return (
        <div className="w-full justify-center flex mb-20">
        <div className="w-[80%]">
            {/* TOOLS */}
            <div className="flex justify-between mb-10 text-sm">
                <div>
                    <p>Showing {page} - {perPage} of {posts.length} posts</p>
                </div>

                <div className="flex">
                    <div className="flex">
                        <p className="px-2 py-1">Show per page</p>
                        <select onChange={handlePerPage} className="px-2 py-1 border-2 rounded-full">
                            <option>10</option>
                            <option>20</option>
                            <option>50</option>
                        </select>
                    </div>
                    <div className="flex">
                        <p className="px-2 py-1">Sort by</p>
                        <select onChange={handleSort} className="px-2 py-1 border-2 rounded-full">
                            <option>Latest</option>
                            <option>Oldest</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* POSTS LIST */}
            <div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">  
                {currentPosts.map((post) => (
                    <div key={post.id} className="border shadow-md rounded-lg">
                        <img src={post.image} alt={post.title} className="w-full object-cover img-ratio rounded-t-lg" />
                        <div className="p-5 truncate-text">
                            <p className="text-sm text-gray-500 mt-2">{post.tanggal}</p>
                            <h1 className="text-lg font-bold mt-2">{post.title}</h1>
                        </div>                    
                    </div>
                ))}
            </div>

            {/* PAGINATION */}
            <div className="flex justify-center mt-10">
                    <button
                        onClick={() => handlePageChange(1)}
                        className="p-2 rounded-l-lg"
                        disabled={page === 1}
                    >
                        <FiChevronsLeft />
                    </button>
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        className="p-2 rounded-l-lg"
                        disabled={page === 1}
                    >
                        <FiChevronLeft />
                    </button>
                    
                    {visiblePages.map((p) => (
                        <button
                            key={p}
                            onClick={() => handlePageChange(p)}
                            className={`p-2 px-3 ${page === p ? 'bg-[#ff6600] rounded-md text-white' : ''}`}
                        >
                            {p}
                        </button>
                    ))}

                    <button
                        onClick={() => handlePageChange(page + 1)}
                        className="p-2 rounded-r-lg"
                        disabled={page === totalPages}
                    >
                        <FiChevronRight />
                    </button>
                    <button
                        onClick={() => handlePageChange(totalPages)}
                        className="p-2 rounded-r-lg"
                        disabled={page === totalPages}
                    >
                        <FiChevronsRight />
                    </button>
            </div>
        </div>
        </div>
    )
}