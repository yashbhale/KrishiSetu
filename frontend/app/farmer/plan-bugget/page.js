'use client';

import { useState } from 'react';
import {
  Card, CardContent, CardHeader, CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select, SelectTrigger, SelectValue,
  SelectContent, SelectItem
} from '@/components/ui/select';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import Navbar from '@/app/components/Navbar';
import PageVoiceAssistant from '@/app/components/PageVoiceAssistant';

const COLORS = ['#4caf50', '#81c784', '#a5d6a7', '#c8e6c9'];

export default function PlanBudgetPage() {
  const [landArea, setLandArea] = useState('');
  const [crop, setCrop] = useState('');
  const [fertilizer, setFertilizer] = useState('');
  const [seedBrand, setSeedBrand] = useState('');
  const [textResult, setTextResult] = useState('');
  const [budgetData, setBudgetData] = useState(null);

  const parseBudget = (text) => {
    const lines = text.split('\n');
    const costData = {
      seed: 0,
      fertilizer: 0,
      labor: 0,
      irrigation: 0,
      recommendations: ''
    };

    lines.forEach((line) => {
      const lower = line.toLowerCase();
      if (lower.includes('seed cost')) {
        costData.seed = parseInt(line.replace(/\D/g, '')) || 0;
      } else if (lower.includes('fertilizer cost')) {
        costData.fertilizer = parseInt(line.replace(/\D/g, '')) || 0;
      } else if (lower.includes('labor')) {
        costData.labor = parseInt(line.replace(/\D/g, '')) || 0;
      } else if (lower.includes('irrigation')) {
        costData.irrigation = parseInt(line.replace(/\D/g, '')) || 0;
      } else if (lower.includes('recommendation')) {
        costData.recommendations += line + '\n';
      }
    });

    setBudgetData(costData);
  };

  const promptGemini = async () => {
    if (!landArea || !crop) return;

    let prompt = `I am planning a farming budget. Here are the details:\nCrop: ${crop}\nLand Area: ${landArea} acres\n`;

    prompt += fertilizer.trim()
      ? `Fertilizer: ${fertilizer}\n`
      : `Suggest the best fertilizer for ${crop}.\n`;

    prompt += seedBrand.trim()
      ? `Seed Brand: ${seedBrand}\n`
      : `Suggest high-quality seed brands for ${crop}.\n`;

    prompt += `Please provide a detailed budget analysis including seed cost, fertilizer cost, labor, irrigation, and recommendations.`;

    try {
      const res = await fetch('/api/gemini-helper', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await res.json();
      setTextResult(data.result);
      parseBudget(data.result);
    } catch (error) {
      console.error('Error fetching Gemini result:', error);
    }
  };

  return (
    <>
    <Navbar />
    <PageVoiceAssistant audioFile="planbudget.mp3" />
    <div className="max-w-5xl mx-auto py-10 px-4 space-y-8">
      <Card className="shadow-md border border-green-300">
        <CardHeader className="bg-green-100 border-b">
          <CardTitle className="text-2xl font-bold text-green-800">🌱 Plan Your Farming Budget with AI</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <div>
            <label className="text-sm font-medium text-green-700">Land Area (in acres)</label>
            <Input type="number" value={landArea} onChange={(e) => setLandArea(e.target.value)} className="mt-1 border-green-400" />
          </div>
          <div>
            <label className="text-sm font-medium text-green-700">Crop Type</label>
            <Select onValueChange={setCrop}>
              <SelectTrigger className="mt-1 border-green-400">
                <SelectValue placeholder="Select Crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="cotton">Cotton</SelectItem>
                <SelectItem value="rice">Rice</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="text-sm font-medium text-green-700">Fertilizer <span className="text-green-600">(optional)</span></label>
            <Input value={fertilizer} onChange={(e) => setFertilizer(e.target.value)} className="mt-1 border-green-400" placeholder="e.g., Urea, DAP" />
          </div>
          <div>
            <label className="text-sm font-medium text-green-700">Seed Brand <span className="text-green-600">(optional)</span></label>
            <Input value={seedBrand} onChange={(e) => setSeedBrand(e.target.value)} className="mt-1 border-green-400" placeholder="e.g., Mahyco, Bayer" />
          </div>
          <div className="md:col-span-2">
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white" onClick={promptGemini}>
              Generate AI Budget Plan 🌿
            </Button>
          </div>
        </CardContent>
      </Card>

      {textResult && (
        <Card className="shadow-lg border border-green-200 bg-green-50">
          <CardHeader className="border-b">
            <CardTitle className="text-xl font-semibold text-green-800">📊 AI Budget Analysis</CardTitle>
          </CardHeader>
          <CardContent className="pt-4 text-green-800 whitespace-pre-line leading-relaxed text-sm">
            {textResult}
          </CardContent>
        </Card>
      )}

      {budgetData && (
        <Card className="shadow-lg border border-green-300 bg-white">
          <CardHeader className="border-b bg-green-100">
            <CardTitle className="text-xl font-semibold text-green-800">📈 Budget Distribution Chart</CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Seed', value: budgetData.seed },
                    { name: 'Fertilizer', value: budgetData.fertilizer },
                    { name: 'Labor', value: budgetData.labor },
                    { name: 'Irrigation', value: budgetData.irrigation },
                  ]}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  fill="#4caf50"
                  label
                >
                  {COLORS.map((color, index) => (
                    <Cell key={`cell-${index}`} fill={color} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
    </>
  );
}
