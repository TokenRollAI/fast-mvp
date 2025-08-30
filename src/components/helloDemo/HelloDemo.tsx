'use client';

import { useState } from 'react';
import { trpc } from '@/lib/trpc/client';

export default function HelloDemo() {
  const [name, setName] = useState('');
  const [selectedName, setSelectedName] = useState('');

  const utils = trpc.useUtils();

  // 使用tRPC mutations
  const sayHelloMutation = trpc.hello.sayHello.useMutation({
    onSuccess: () => {
      // 成功后刷新所有记录
      utils.hello.getAll.invalidate();
      // 清空选中的名字以隐藏查询结果
      if (selectedName === name.trim()) {
        setSelectedName('');
      }
    },
  });

  // 使用tRPC queries - 直接使用，无需封装
  const getCountQuery = trpc.hello.getCount.useQuery(
    { name: selectedName },
    {
      enabled: !!selectedName,
    }
  );

  const getAllQuery = trpc.hello.getAll.useQuery();

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">问候系统</h2>

        <div className="mb-4">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="输入名字..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex gap-2 mb-4">
          <button
            onClick={() => name.trim() && sayHelloMutation.mutate({ name: name.trim() })}
            disabled={sayHelloMutation.isPending || !name.trim()}
            className="flex-1 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 disabled:bg-gray-300"
          >
            {sayHelloMutation.isPending ? '处理中...' : '说Hello'}
          </button>

          <button
            onClick={() => name.trim() && setSelectedName(name.trim())}
            disabled={!name.trim()}
            className="flex-1 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 disabled:bg-gray-300"
          >
            查询次数
          </button>
        </div>

        {/* 显示mutation结果 */}
        {sayHelloMutation.data && (
          <div className="mb-4 p-4 bg-blue-50 rounded-md">
            <h3 className="font-semibold mb-2">操作结果:</h3>
            <p className="text-sm text-gray-700">{sayHelloMutation.data.message}</p>
            <p className="text-sm text-gray-600 mt-1">
              当前次数: {sayHelloMutation.data.count}
            </p>
          </div>
        )}

        {/* 显示查询结果 */}
        {getCountQuery.data && selectedName && (
          <div className="mb-4 p-4 bg-green-50 rounded-md">
            <h3 className="font-semibold mb-2">查询结果:</h3>
            <p className="text-sm text-gray-700">{getCountQuery.data.message}</p>
            <p className="text-sm text-gray-600 mt-1">
              问候次数: {getCountQuery.data.count}
            </p>
          </div>
        )}

        {/* 显示错误 */}
        {(sayHelloMutation.error || getCountQuery.error) && (
          <div className="mb-4 p-4 bg-red-50 rounded-md">
            <h3 className="font-semibold mb-2 text-red-600">错误:</h3>
            <p className="text-sm text-red-700">
              {sayHelloMutation.error?.message || getCountQuery.error?.message}
            </p>
          </div>
        )}
      </div>

      {/* 显示所有记录 */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-xl font-bold mb-4 text-gray-800">所有问候记录</h3>

        {getAllQuery.isLoading && <p>加载中...</p>}

        {getAllQuery.data && getAllQuery.data.length > 0 ? (
          <div className="space-y-2">
            {getAllQuery.data.map((record) => (
              <div key={record.id} className="flex justify-between items-center p-3 bg-gray-50 rounded">
                <span className="font-medium">{record.name}</span>
                <span className="text-gray-600">问候了 {record.count} 次</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">暂无记录</p>
        )}
      </div>
    </div>
  );
}
