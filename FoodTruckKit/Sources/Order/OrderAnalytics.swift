/*
See the LICENSE.txt file for this sample's licensing information.

Abstract:
Analytics struct for computing order completion time statistics.
*/

import Foundation

/// A struct that computes completion-time statistics for a collection of orders.
public struct OrderAnalytics {
    /// The average completion time in minutes, or `nil` if no completed orders exist.
    public let averageCompletionMinutes: Double?

    /// The minimum completion time in minutes, or `nil` if no completed orders exist.
    public let minimumCompletionMinutes: Double?

    /// The maximum completion time in minutes, or `nil` if no completed orders exist.
    public let maximumCompletionMinutes: Double?

    /// The median completion time in minutes, or `nil` if no completed orders exist.
    public let medianCompletionMinutes: Double?

    /// The number of completed orders used to compute these statistics.
    public let completedOrderCount: Int

    /// Creates an `OrderAnalytics` value from the given collection of orders.
    /// Only orders that have a recorded `completedAt` timestamp are included in the statistics.
    public init(orders: [Order]) {
        let durations = orders
            .compactMap { $0.completionDurationInMinutes }
            .filter { $0 >= 0 }

        completedOrderCount = durations.count

        guard !durations.isEmpty else {
            averageCompletionMinutes = nil
            minimumCompletionMinutes = nil
            maximumCompletionMinutes = nil
            medianCompletionMinutes = nil
            return
        }

        let sorted = durations.sorted()
        averageCompletionMinutes = durations.reduce(0, +) / Double(durations.count)
        minimumCompletionMinutes = sorted.first
        maximumCompletionMinutes = sorted.last
        medianCompletionMinutes = Self.median(of: sorted)
    }

    // MARK: - Private helpers

    private static func median(of sorted: [Double]) -> Double {
        let count = sorted.count
        if count % 2 == 1 {
            return sorted[count / 2]
        } else {
            return (sorted[count / 2 - 1] + sorted[count / 2]) / 2.0
        }
    }
}
