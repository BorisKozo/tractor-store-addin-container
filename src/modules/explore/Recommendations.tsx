import * as React from 'react';
import data from './data/db.json';
import { Recommendation } from './components/Recommendation';
import './css/Recommendations.css';

interface ISkuData {
    name: string;
    sku: string;
    image: string;
    url: string;
    rgb: [number, number, number];
}

interface SkuDataMap {
    [key: string]: ISkuData;
}

const staticRecommendations: SkuDataMap = data.recommendations as unknown as SkuDataMap;


function averageColor(colors: Array<[number, number, number]>) {
    const total = colors.reduce((acc, [r, g, b]) => [acc[0] + r, acc[1] + g, acc[2] + b], [0, 0, 0]);
    return total.map((c) => Math.round(c / colors.length)) as [number, number, number];
}

function skusToColors(skus: string[]) {
    return skus
        .filter((sku: string): ISkuData => staticRecommendations[sku] as ISkuData)
        .map((sku) => staticRecommendations[sku].rgb);
}

function colorDistance(rgb1: [number, number, number], rgb2: [number, number, number]) {
    const [r1, g1, b1] = rgb1;
    const [r2, g2, b2] = rgb2;
    return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
}

function recosForSkus(skus: Array<string>, length = 4) {
    const targetRgb = averageColor(skusToColors(skus));
    const distances = [];

    for (const sku in staticRecommendations) {
        if (!skus.includes(sku)) {
            const distance = colorDistance(targetRgb, staticRecommendations[sku].rgb);
            distances.push({ sku, distance });
        }
    }

    distances.sort((a, b) => a.distance - b.distance);
    return distances.slice(0, length).map((d) => staticRecommendations[d.sku]);
}

const Recommendations: React.FC<{ skus: Array<string> }> = ({ skus }) => {
    const recos = recosForSkus(skus);
    return recos.length ? (
        <div className="e_Recommendations" data-boundary="explore">
            <h2>Recommendations</h2>
            <ul className="e_Recommendations_list">
                {recos.map((reco, i) => (
                    <Recommendation key={i} {...reco} />
                ))}
            </ul>
        </div>
    ) : null;
};

export { Recommendations };
