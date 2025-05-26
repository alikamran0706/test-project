import { Edit, Eye } from "lucide-react";
import Card from "./ui/Card";
import CardContent from "./ui/Card/CardContent";
import Image from "next/image";

const CardGrid = ({ cards, toggleModal, setNewCard }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {cards.map((card) => (
                <Card key={card.id} className={`relative group hover:bg-gray-300`}>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 
                            transition-opacity duration-200 flex gap-2 z-10"
                    >
                        <button
                            onClick={() => handleView(card.id)}
                            className="bg-white/90 hover:bg-white p-1.5 rounded-lg shadow-sm border border-gray-200"
                        >
                            <Eye className="w-4 h-4 text-gray-600" />
                        </button>
                        <button
                            onClick={() => {
                                setNewCard(card)
                                toggleModal()
                            }}
                            className="bg-white/90 hover:bg-white p-1.5 rounded-lg shadow-sm border border-gray-200"
                        >
                            <Edit className="w-4 h-4 text-gray-600" />
                        </button>
                    </div>
                    <CardContent>
                        {card.image && (
                            <div className="aspect-video relative">
                                <Image src={card.image || "/placeholder.svg"} alt={card.header} fill className="object-cover" />
                            </div>
                        )}

                        <h3 className="font-semibold text-sm mb-2">{card.header}</h3>
                        <p className="text-xs text-gray-600 mb-3 line-clamp-4">{card.description}</p>

                        {card.fields.length > 0 && (
                            <div className="space-y-2">
                                {card.fields.map((field) => (
                                    <div key={field.id} className="flex items-center gap-2">
                                        <input
                                            type="checkbox"
                                            checked={field.value}
                                            readOnly
                                            className="w-4 h-4 text-blue-600 rounded border-gray-300"
                                        />
                                        <span className="text-xs text-gray-700">{field.label}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

            ))}
        </div>
    );
};

export default CardGrid;
