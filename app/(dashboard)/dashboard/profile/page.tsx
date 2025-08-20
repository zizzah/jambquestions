/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useState} from "react";
import type { Session } from "next-auth";

async function getSession() {
  const session = await auth();
  return session;
}

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [status, setStatus] = useState("loading");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    target: "",
    subjects: [],
  });

  // Fetch session data on component mount

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call to update profile
    setIsEditing(false);
  };

  // Show loading state while session is being fetched
  if (status === "loading") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  // Redirect or show message if not authenticated
  if (!session || status === "unauthenticated") {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <p>Please sign in to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-center gap-6 mb-8">
         
          <div className="flex-1 text-center sm:text-left">
            <h1 className="text-2xl font-bold">{session.user?.name}</h1>
            <p className="text-gray-600">{session.user?.email}</p>
          </div>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        {/* Profile Form */}
        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bio
              </label>
             
            </div>
            
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </form>
        ) : (
          /* Profile Stats */
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Practice Stats</h3>
              <p>Questions Attempted: 150</p>
              <p>Correct Answers: 120</p>
              <p>Accuracy: 80%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Mock Tests</h3>
              <p>Tests Completed: 5</p>
              <p>Average Score: 75%</p>
              <p>Best Score: 85%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Study Time</h3>
              <p>This Week: 12 hours</p>
              <p>Total: 48 hours</p>
              <p>Streak: 5 days</p>
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Completed Mathematics Practice</p>
                <p className="text-sm text-gray-600">Scored 85% • 30 minutes ago</p>
              </div>
              <span className="text-green-600">+10 points</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Finished English Mock Test</p>
                <p className="text-sm text-gray-600">Scored 78% • 2 hours ago</p>
              </div>
              <span className="text-green-600">+15 points</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">Studied Physics Concepts</p>
                <p className="text-sm text-gray-600">45 minutes • 5 hours ago</p>
              </div>
              <span className="text-green-600">+5 points</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}