interface FilePreviewProps {
  url: string;
  type: string;
}

export const FilePreview = ({ url, type }: FilePreviewProps) => {
  if (type.startsWith("image/")) {
    return <img src={url} alt="File Preview" className="max-w-full rounded" />;
  }

  if (type === "application/pdf") {
    return <iframe src={url} className="w-full h-96 border" />;
  }

  if (type.startsWith("video/")) {
    return <video src={url} controls className="w-full rounded" />;
  }

  if (type.startsWith("audio/")) {
    return <audio src={url} controls />;
  }

  return (
    <div className="text-sm text-gray-600">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        View or Download File
      </a>
    </div>
  );
};
