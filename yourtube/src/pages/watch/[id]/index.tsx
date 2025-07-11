"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Comments from "@/components/Comments";
import RelatedVideos from "@/components/RelatedVideos";
import VideoInfo from "@/components/VideoInfo";
import Videopplayer from "@/components/Videopplayer";
import axios from "axios";

const WatchPage = () => {
  const router = useRouter();
  const { id } = router.query;

  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [allVideos, setAllVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      if (!id || typeof id !== "string") return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/video/getall`
        );

        console.log("Fetched videos:", res.data);

        const matchedVideo = res.data.find((vid: any) => vid._id === id);
        setSelectedVideo(matchedVideo || null);
        setAllVideos(res.data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideo();
  }, [id]);

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!selectedVideo)
    return <div className="text-center mt-10 text-red-500">Video not found</div>;

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <Videopplayer video={selectedVideo} />
            <VideoInfo video={selectedVideo} />
            <Comments videoId={id as string} />
          </div>
          <div className="space-y-4">
            <RelatedVideos videos={allVideos} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
