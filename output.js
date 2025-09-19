import React, { useState, useEffect } from 'react';
import { Upload, FileText, AlertTriangle, CheckCircle, RefreshCw, DollarSign, BarChart3 } from 'lucide-react';

const SmartDocChecker = () => {
  const [documents, setDocuments] = useState([]);
  const [analysisResults, setAnalysisResults] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [usageStats, setUsageStats] = useState({
    documentsChecked: 0,
    reportsGenerated: 0,
    totalCost: 0
  });
  const [externalUpdates, setExternalUpdates] = useState([]);
  const [activeTab, setActiveTab] = useState('upload');

  // Mock data for demonstration
  const mockDocuments = [
    {
      id: 1,
      name: 'Project Guidelines.pdf',
      content: 'All projects must be submitted before 10 PM on the due date. Late submissions will not be accepted.'
    },
    {
      id: 2,
      name: 'University Rules.docx',
      content: 'The official deadline for all submissions is midnight. Extensions can be requested for valid reasons.'
    },
    {
      id: 3,
      name: 'HR Handbook.pdf',
      content: 'Employees must provide two weeks notice before leaving the company. This policy applies to all departments.'
    },
    {
      id: 4,
      name: 'Employment Contract.pdf',
      content: 'All employees must provide one month notice before termination. This supersedes any other policy.'
    }
  ];

  const mockConflicts = [
    {
      id: 1,
      documents: ['Project Guidelines.pdf', 'University Rules.docx'],
      conflict: 'Submission deadline discrepancy',
      description: 'Project Guidelines states "10 PM deadline" while University Rules states "midnight deadline"',
      severity: 'high',
      suggestion: 'Standardize the submission deadline across all documents to midnight for consistency.'
    },
    {
      id: 2,
      documents: ['HR Handbook.pdf', 'Employment Contract.pdf'],
      conflict: 'Notice period contradiction',
      description: 'HR Handbook requires "2 weeks notice" while Employment Contract requires "1 month notice"',
      severity: 'critical',
      suggestion: 'Clarify that employment contracts take precedence over handbooks, or update both documents.'
    }
  ];

  const mockExternalUpdates = [
    {
      id: 1,
      source: 'College Policy Page',
      update: 'New attendance policy: Minimum 70% attendance required for all courses',
      timestamp: '2024-01-15 14:30',
      status: 'new'
    },
    {
      id: 2,
      source: 'Government Regulations',
      update: 'Updated data privacy requirements for educational institutions',
      timestamp: '2024-01-14 09:15',
      status: 'pending'
    }
  ];

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    const newDocuments = files.map((file, index) => ({
      id: Date.now() + index,
      name: file.name,
      size: (file.size / 1024).toFixed(2) + ' KB',
      uploadedAt: new Date().toLocaleString(),
      content: '' // In a real app, this would contain the file content
    }));
    
    setDocuments(prev => [...prev, ...newDocuments]);
    
    // Update usage stats
    setUsageStats(prev => ({
      ...prev,
      documentsChecked: prev.documentsChecked + files.length,
      totalCost: prev.totalCost + (files.length * 2.50) // $2.50 per document
    }));
  };

  const analyzeDocuments = () => {
    setIsAnalyzing(true);
    
    // Simulate analysis delay
    setTimeout(() => {
      setAnalysisResults(mockConflicts);
      setIsAnalyzing(false);
      
      // Update usage stats
      setUsageStats(prev => ({
        ...prev,
        reportsGenerated: prev.reportsGenerated + 1,
        totalCost: prev.totalCost + 5.00 // $5.00 per report
      }));
    }, 2000);
  };

  const generateReport = () => {
    // In a real app, this would generate a downloadable report
    alert('Report generated successfully! In a real application, this would download a PDF report.');
    
    // Update usage stats
    setUsageStats(prev => ({
      ...prev,
      reportsGenerated: prev.reportsGenerated + 1,
      totalCost: prev.totalCost + 5.00
    }));
  };

  const clearAll = () => {
    setDocuments([]);
    setAnalysisResults([]);
  };

  useEffect(() => {
    // Simulate external updates
    setExternalUpdates(mockExternalUpdates);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <FileText className="h-8 w-8 text-indigo-600 mr-3" />
              <h1 className="text-3xl font-bold text-gray-900">Smart Doc Checker</h1>
            </div>
            <div className="flex items-center space-x-6">
              <div className="flex items-center bg-green-100 px-4 py-2 rounded-lg">
                <DollarSign className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-semibold text-green-800">${usageStats.totalCost.toFixed(2)}</span>
              </div>
              <div className="flex items-center bg-blue-100 px-4 py-2 rounded-lg">
                <BarChart3 className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-semibold text-blue-800">
                  {usageStats.documentsChecked} docs, {usageStats.reportsGenerated} reports
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8">
            {['upload', 'analysis', 'external'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-4 font-medium text-sm rounded-md transition-colors ${
                  activeTab === tab
                    ? 'bg-indigo-100 text-indigo-700 border-b-2 border-indigo-600'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab === 'upload' && 'Document Upload'}
                {tab === 'analysis' && 'Conflict Analysis'}
                {tab === 'external' && 'External Updates'}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'upload' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Documents</h2>
              <p className="text-gray-600">Upload 2-3 documents to check for contradictions and conflicts</p>
            </div>

            {/* Upload Area */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-8 hover:border-indigo-400 transition-colors">
              <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <div className="flex text-sm text-gray-600 justify-center">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500">
                  <span>Upload files</span>
                  <input 
                    type="file" 
                    className="sr-only" 
                    multiple 
                    accept=".pdf,.doc,.docx,.txt"
                    onChange={handleFileUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500 mt-2">PDF, DOC, DOCX, TXT up to 10MB each</p>
            </div>

            {/* Uploaded Documents */}
            {documents.length > 0 && (
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploaded Documents</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {documents.map((doc) => (
                    <div key={doc.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-start">
                        <FileText className="h-8 w-8 text-indigo-500 mr-3 flex-shrink-0" />
                        <div>
                          <h4 className="font-medium text-gray-900 truncate">{doc.name}</h4>
                          <p className="text-sm text-gray-500">{doc.size}</p>
                          <p className="text-xs text-gray-400">{doc.uploadedAt}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-4">
              <button
                onClick={analyzeDocuments}
                disabled={documents.length < 2 || isAnalyzing}
                className="flex items-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="animate-spin h-5 w-5 mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <FileText className="h-5 w-5 mr-2" />
                    Analyze Documents
                  </>
                )}
              </button>
              
              {documents.length > 0 && (
                <button
                  onClick={clearAll}
                  className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                >
                  Clear All
                </button>
              )}
            </div>
          </div>
        )}

        {activeTab === 'analysis' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Conflict Analysis</h2>
              <p className="text-gray-600">Review detected contradictions and suggested resolutions</p>
            </div>

            {analysisResults.length > 0 ? (
              <div className="space-y-6">
                {analysisResults.map((conflict) => (
                  <div key={conflict.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <AlertTriangle className={`h-6 w-6 mr-3 ${
                          conflict.severity === 'critical' ? 'text-red-500' : 'text-yellow-500'
                        }`} />
                        <h3 className="text-lg font-semibold text-gray-900">{conflict.conflict}</h3>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        conflict.severity === 'critical' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {conflict.severity.toUpperCase()}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{conflict.description}</p>
                    
                    <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-4">
                      <div className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-blue-600 mr-2 flex-shrink-0" />
                        <h4 className="font-medium text-blue-800">Suggested Resolution</h4>
                      </div>
                      <p className="text-blue-700 mt-2">{conflict.suggestion}</p>
                    </div>
                    
                    <div className="text-sm text-gray-500">
                      <p>Affected Documents:</p>
                      <ul className="list-disc list-inside mt-1">
                        {conflict.documents.map((doc, index) => (
                          <li key={index}>{doc}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
                
                <div className="flex gap-4 pt-4">
                  <button
                    onClick={generateReport}
                    className="flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <FileText className="h-5 w-5 mr-2" />
                    Generate Detailed Report
                  </button>
                  
                  <button
                    onClick={() => setActiveTab('upload')}
                    className="px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                  >
                    Upload More Documents
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No Analysis Results</h3>
                <p className="text-gray-500 mb-6">Upload documents and run analysis to detect conflicts</p>
                <button
                  onClick={() => setActiveTab('upload')}
                  className="px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition-colors"
                >
                  Upload Documents
                </button>
              </div>
            )}
          </div>
        )}

        {activeTab === 'external' && (
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">External Policy Updates</h2>
              <p className="text-gray-600">Monitor external sources for policy changes that may create conflicts</p>
            </div>

            <div className="space-y-6">
              {externalUpdates.map((update) => (
                <div key={update.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{update.source}</h3>
                      <p className="text-sm text-gray-500">{update.timestamp}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      update.status === 'new' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {update.status}
                    </span>
                  </div>
                  
                  <p className="text-gray-700 mb-4">{update.update}</p>
                  
                  <div className="flex gap-3">
                    <button className="px-4 py-2 bg-indigo-100 text-indigo-700 font-medium rounded-lg hover:bg-indigo-200 transition-colors">
                      Analyze Impact
                    </button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors">
                      Mark as Reviewed
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Pathway Integration</h3>
              <p className="text-gray-700 mb-4">
                This system monitors external policy pages in real-time. When updates are detected, 
                automatic conflict analysis is triggered to ensure your documents remain compliant.
              </p>
              <div className="flex items-center text-sm text-blue-600">
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Monitoring active - Last check: 2 minutes ago
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Doc Checker</h3>
              <p className="text-gray-600">
                Automatically detect contradictions in your documents and ensure compliance with external policies.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
              <ul className="text-gray-600 space-y-2">
                <li className="flex justify-between">
                  <span>Per Document Analysis</span>
                  <span className="font-medium">$2.50</span>
                </li>
                <li className="flex justify-between">
                  <span>Per Detailed Report</span>
                  <span className="font-medium">$5.00</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Summary</h3>
              <div className="space-y-2 text-gray-600">
                <div className="flex justify-between">
                  <span>Documents Checked:</span>
                  <span className="font-medium">{usageStats.documentsChecked}</span>
                </div>
                <div className="flex justify-between">
                  <span>Reports Generated:</span>
                  <span className="font-medium">{usageStats.reportsGenerated}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span>Total Cost:</span>
                  <span className="font-semibold text-green-600">${usageStats.totalCost.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t text-center text-gray-500">
            <p>© 2024 Smart Doc Checker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default SmartDocChecker;
