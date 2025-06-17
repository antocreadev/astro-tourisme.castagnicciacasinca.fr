export default function Agenda() {
  const events = [
    {
      date: "12",
      month: "AVRIL",
      image: "https://placehold.co/600x400?text=1",
      category: "Catégorie",
      title: "Concert de chants Polyphoniques et Corses",
    },
    {
      date: "22",
      month: "JANV",
      image: "https://placehold.co/600x400?text=2",
      category: "Catégorie",
      title: "Concert de chants Polyphoniques et Corses",
    },
    {
      date: "02",
      month: "DEC",
      image: "https://placehold.co/600x400?text=3",
      category: "Catégorie",
      title: "Concert de chants Polyphoniques et Corses",
    },
        {
      date: "8",
      month: "JANV",
      image: "https://placehold.co/600x400?text=4",
      category: "Catégorie",
      title: "Concert de chants Polyphoniques et Corses",
    },
            {
      date: "8",
      month: "JANV",
      image: "https://placehold.co/600x400?text=5",
      category: "Catégorie",
      title: "Concert de chants Polyphoniques et Corses",
    },
  ]

  return (
    <div className="min-h-screen py-16">
      <div className="mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-black mb-8">Agenda</h1>
          <p className="text-lg text-gray-700 max-w-4xl mx-auto leading-relaxed">
            Tout au long de l'année, des multitudes de rendez-vous culturels, musicaux, cinématographiques,
            sportifs et gourmands avec des lieux de vie aux multiples facettes
          </p>
        </div>

        {/* Events Grid */}
        <div className="flex flex-col items-center justify-center md:items-start md:justify-start md:flex-row gap-8 overflow-x-auto pb-4">
          {events.slice(0, 4).map((event, index) => (
            <div key={index} className="flex-shrink-0 w-[25rem]">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm">
                {/* Date Section */}
                <div className="flex">
                  <div className="bg-gray-200 w-24 flex flex-col items-center justify-center py-8">
                    <div className="text-4xl font-bold text-gray-400">{event.date}</div>
                    <div className="text-sm font-medium text-gray-400 mt-1">{event.month}</div>
                  </div>
                  <div className="flex-1">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-full h-48 object-cover"
                    />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <div className="text-sm font-medium text-gray-600 mb-2">{event.category}</div>
                  <h3 className="text-lg font-semibold text-black leading-tight">{event.title}</h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
